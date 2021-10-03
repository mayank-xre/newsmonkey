import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        
        let { title, desc,imag,newsurl } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imag?"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/10/earth-1633083019.jpeg":imag} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
