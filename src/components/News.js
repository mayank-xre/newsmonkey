import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setarticles] = useState([]);
  // eslint-disable-next-line
  const [loading, setloading] = useState(true);
  const [totalarticles, settotarticles] = useState(0);
  const [page, setpage] = useState(1);
  News.defaultProps = {
    country: "in",
    pagesize: 15,
    category: "",
  };
  News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  useEffect(() => {
    async function getnews() {
      props.progf(0);
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&pagesize=${props.pagesize}`;
      props.progf(20);
      let data = await fetch(url);
      props.progf(60);
      let parsedd = await data.json();
      props.progf(80);
      setarticles(parsedd.articles);
      setpage(1);
      settotarticles(parsedd.totalResults);
      setloading(false);
      props.progf(100);
    }
    getnews();
    // eslint-disable-next-line
  }, []);
  const fetchmore = async () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pagesize}`;
    let data = await fetch(url);
    let parsedd = await data.json();
    setarticles(articles.concat(parsedd.articles));
    settotarticles(parsedd.totalResults);
  };

  const handleform = async (event) => {
    let inp = document.getElementById("inpq");
    props.progf(0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&q=${inp.value}&category=${props.category}&apiKey=${props.apikey}&pagesize=${props.pagesize}`;
    props.progf(20);
    let data = await fetch(url);
    props.progf(60);
    let parsedd = await data.json();
    props.progf(80);
    setarticles(parsedd.articles);
    setpage(1);
    settotarticles(parsedd.totalResults);
    setloading(false);
    props.progf(100);
  };
  return (
    <>
      <div className="container d-flex justify-content-between" style={{ marginTop: '70px',marginBottom:"10px" }}
>
        <h2 className="">Top Headlines</h2>
        {/* eslint-disable-next-line */}
        <form action="javascript:void(0);" className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            id="inpq"
            placeholder="Search News"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleform}
          >
            Search
          </button>
        </form>
      </div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchmore}
        hasMore={articles.length !== totalarticles}
        loader={<Spinner></Spinner>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              let newsdesc;
              if (element.description == null) {
                newsdesc = "";
              } else if (element.description.length >= 85) {
                newsdesc = element.description.slice(0, 85);
                newsdesc += "...";
              } else {
                newsdesc = element.description;
              }
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    author={element.author}
                    time={element.publishedAt}
                    desc={newsdesc}
                    imag={element.urlToImage}
                    newsurl={element.url}
                  ></NewsItem>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
