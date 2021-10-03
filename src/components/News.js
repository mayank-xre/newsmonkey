import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles=[]
    constructor(){
        super();
        console.log("hello i am a constructor");
        this.state={
            articles:this.articles,
            loading:false
        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&q=covid&apiKey=6845710cfea0488ba68a9ac1ba903d5f"
        let data=await fetch(url)
        let parsedd=await data.json()
        console.log(parsedd)
        this.setState({articles:parsedd.articles})

    }
    render() {
        return (
            <div className="container my-3">
                <h1>Top Headlines</h1>
                <div className="row">
                {this.state.articles.map((element)=>{
                    let newstitle;
                    if(element.title==null){
                        newstitle=""
                    }
                    else if(element.title.length>=45){
                        newstitle=element.title.slice(0,45)
                        newstitle+="..."
                    }
                    else{
                        newstitle=element.title
                    }
                    let newsdesc;
                    if(element.description==null){
                        newsdesc=""
                    }
                    else if(element.description.length>=85){
                        newsdesc=element.description.slice(0,85)
                        newsdesc+="..."
                    }
                    else{
                        newsdesc=element.description
                    }
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={newstitle} desc={newsdesc} imag={element.urlToImage} newsurl={element.url}></NewsItem>
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" class="btn btn-dark">Previous</button>
                    <button type="button" class="btn btn-dark">Next</button>
                </div>
            </div>
        )
    }
}

export default News
