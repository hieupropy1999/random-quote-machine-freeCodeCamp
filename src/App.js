import React from 'react';
import './App.css';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      quotes : [{
       "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"}],
      index: 0
    };
  }
  componentDidMount(){
    //call API and set state
    fetch(API).then(res => res.json())
    .then(res => {
      this.setState({
        quotes: res.quotes
      });
    });
    this.getRandomIndex();
  }
  // console.log(this.state.quotes);
  getRandomIndex =() =>{
    const quotes = this.state.quotes;
    if(quotes.length > 0){
      const index = Math.floor(Math.random() * quotes.length);
      // console.log(index);
      this.setState({
        index
      });
    }
  }
  // console.log(this.state.index);
  render(){
    const quotes = this.state.quotes;
    const index = this.state.index;
    const quote = quotes[index];
    // const {index} = this.state.index;
    // console.log(quote.author);
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote.quote}`;
    return(
      <div className="wrapper row d-flex justify-content-center align-items-center">
        <div className="col-md-6 p-4 box rounded" id="quote-box">          
          {quote && 
            (<div className="mb-4">
              <p id="text"><i className="fas fa-quote-left "></i> {quote.quote}</p>
              <cite className="d-block text-right" id="author">-{quote.author}</cite>
            </div>
            )}
            <div className = "d-flex justify-content-between">
              <a className="btn btn-primary btn-sm" id="tweet-quote" href={twitterURL}><i className="fab fa-twitter"></i> Twitter</a>
              <button className="btn btn-primary btn-sm" id="new-quote" onClick={this.getRandomIndex}><i className="fas fa-random"></i> New Quote</button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
