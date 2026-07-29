module Statuslog
  SPANISH_MONTHS = %w[
    enero febrero marzo abril mayo junio
    julio agosto septiembre octubre noviembre diciembre
  ].freeze

  # One static page per status, generated from _data/statuslog.json
  # (refreshed at build time by node-scripts/updateStatuslog.js).
  class Page < Jekyll::PageWithoutAFile
    def initialize(site, status, older_status, newer_status)
      super(site, site.source, File.join("status", status["id"]), "index.html")

      excerpt = status["content"].to_s.strip
      excerpt = "(sin texto)" if excerpt.empty?
      title = excerpt.length > 70 ? "#{excerpt[0...70]}…" : excerpt

      status["created_iso"] = created_time(status).utc.iso8601
      status["created_human"] = format_created_human(created_time(status))
      status["emoji_codepoints"] = emoji_codepoints(status["emoji"])
      # "Anterior"/"Siguiente" follow array order (newest-first), matching
      # the pagination controls on /status and /links: Anterior moves toward
      # newer entries (lower index), Siguiente moves toward older ones
      # (higher index) — same direction Jekyll's own page.previous/page.next
      # use for reverse-chronological collections.
      status["prev_id"] = newer_status && newer_status["id"]
      status["next_id"] = older_status && older_status["id"]

      self.content = ""
      self.data.merge!(
        "layout" => "status",
        "title" => title,
        "description" => excerpt,
        "image" => "/assets/images/logo.png",
        "status" => status
      )
    end

    private

    def created_time(status)
      Time.at(status["created"].to_i)
    end

    # "22 julio 2026, 7:25 AM" — same date convention used elsewhere on the
    # site. Relies on Jekyll having set ENV["TZ"] from site.timezone, so
    # `time` here is already in America/Chihuahua local time.
    def format_created_human(time)
      hour12 = time.hour % 12
      hour12 = 12 if hour12.zero?
      meridiem = time.hour < 12 ? "AM" : "PM"

      "#{time.day} #{SPANISH_MONTHS[time.month - 1]} #{time.year}, #{hour12}:#{time.strftime('%M')} #{meridiem}"
    end

    # Mirrors emojiToCodepoints() in assets/src/statuslog-archive.js so both
    # the single-status page and the archive listing resolve the same
    # fluentui-emoji-unicode asset.
    def emoji_codepoints(emoji)
      return nil if emoji.nil? || emoji.empty?

      emoji.each_char
           .map { |char| char.ord.to_s(16) }
           .reject { |codepoint| codepoint == "fe0f" }
           .join("-")
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :normal

    def generate(site)
      statuses = site.data["statuslog"]
      return if statuses.nil? || statuses.empty?

      # statuses is newest-first, so the next-older status sits at i+1
      # and the next-newer status sits at i-1.
      statuses.each_with_index do |status, i|
        older_status = statuses[i + 1]
        newer_status = i.zero? ? nil : statuses[i - 1]
        site.pages << Page.new(site, status, older_status, newer_status)
      end
    end
  end
end
