import { useState, useEffect, useCallback } from "react";

const Paging = (props) => {
  const { total, nowPage, setNowPage } = props;
  
  const renderPagingNumber = useCallback(() => {
    const allPage = Math.ceil(total / 20);
    const nowMaxNum =
      nowPage * 20 >= total ? allPage : Math.ceil(nowPage / 10) * 10;
    const nowMinNum =
      nowPage === 1 ? 1 : (Math.ceil(nowPage / 10) - 1) * 10 + 1;
    let pagArr = [];
    for (let i = nowMinNum; i <= nowMaxNum; i++) {
      pagArr.push(
        <button
          key={i}
          onClick={() => setNowPage(i)}
          style={{ color: `${i === nowPage ? "red" : "black"}` }}
        >
          {i}
        </button>
      );
    }
    return pagArr;
  }, [props]);

  const returnPagingAria = useCallback(() => {
    const allPage = Math.ceil(total / 20);
    return (
      <div className={`pagingAria`}>
        <button onClick={() => setNowPage(1)}>go First</button>
        <button
          disabled={nowPage === 1 ? true : false}
          onClick={() => setNowPage(nowPage - 1)}
        >
          prev
        </button>
        {renderPagingNumber()}
        <button
          disabled={allPage === nowPage ? true : false}
          onClick={() => setNowPage(nowPage + 1)}
        >
          next
        </button>
        <button onClick={() => setNowPage(allPage)}>go Last</button>
      </div>
    );
  }, [nowPage]);

  const returnDefaultAria = () => {
    return (
      <div>
        <button>prev</button>
        <button>next</button>
      </div>
    );
  };

  return <div>{props?.total ? returnPagingAria() : returnDefaultAria()}</div>;
};

export default Paging;
