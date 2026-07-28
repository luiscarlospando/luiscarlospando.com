module Statuslog
  # One static page per status, generated from _data/statuslog.json
  # (refreshed at build time by node-scripts/updateStatuslog.js).
  class Page < Jekyll::PageWithoutAFile
    def initialize(site, status)
      super(site, site.source, File.join("status", status["id"]), "index.html")

      excerpt = status["content"].to_s.strip
      excerpt = "(sin texto)" if excerpt.empty?
      title = excerpt.length > 70 ? "#{excerpt[0...70]}…" : excerpt

      status["created_iso"] = created_time(status).utc.iso8601
      status["created_human"] = created_time(status).strftime("%d/%m/%Y %H:%M")
      status["emoji_codepoints"] = emoji_codepoints(status["emoji"])

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

      statuses.each do |status|
        site.pages << Page.new(site, status)
      end
    end
  end
end
