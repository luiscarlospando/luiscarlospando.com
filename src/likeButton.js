class LikeButton extends React.Component {
    constructor() {
      super();
      this.state = {
        liked: false
      };
      this.handleClick = this.handleClick.bind(this);
    } 
    
    handleClick() {
      this.setState({
        liked: !this.state.liked
      });
    }
    
    render() {
      const text = this.state.liked ? 'Te gustó' : 'No te gustó';
      const label = this.state.liked ? 'Quitar me gusta' : 'Me gusta'
      return (
        <div className="btn-me-gusta-container">
          <button className="btn btn-primary" onClick={this.handleClick}>
            {label}</button>
          <p>
            {text} este post.
          </p>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <LikeButton />,
    document.getElementById('btn-me-gusta')
  )