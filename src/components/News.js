import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    articles=[]
    static defaultProps={
        country:"in&category=${this.props.category}",
        pagesize:5,
    }
    static propTypes={
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string,
    }
    constructor(){
        super();
        console.log("hello i am a constructor");
        this.state={
            articles:this.articles,
            loading:false
        }
    }
    async componentDidMount(){
        this.setState({loading:true})
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6845710cfea0488ba68a9ac1ba903d5f&pagesize=${this.props.pagesize}`
        let data=await fetch(url)
        let parsedd=await data.json()
        console.log(parsedd)
        this.setState({articles:parsedd.articles,page:1,totalarticles:parsedd.totalResults,loading:false})
    }
    prevclick=async ()=>{
        console.log("prev")
        this.setState({loading:true})
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6845710cfea0488ba68a9ac1ba903d5f&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
        let data=await fetch(url)
        let parsedd=await data.json()
        console.log(parsedd)
        this.setState({articles:parsedd.articles,page:this.state.page-1,loading:false})
    }
    nextclick=async ()=>{
        console.log("next")
        this.setState({loading:true})
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=6845710cfea0488ba68a9ac1ba903d5f&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
        let data=await fetch(url)
        let parsedd=await data.json()
        console.log(parsedd)
        this.setState({articles:parsedd.articles,page:this.state.page+1,loading:false})
    }
    render() {
        return (
            <div className="container my-3">
                <h1>Top Headlines</h1>
                {this.state.loading&&<Spinner></Spinner>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
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
                    <NewsItem title={element.title} desc={newsdesc} imag={element.urlToImage} newsurl={element.url}></NewsItem>
                    </div>
                })}
                </div>                
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-sm btn-dark" onClick={this.prevclick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalarticles/this.props.pagesize)}className="btn btn-sm btn-dark" onClick={this.nextclick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
