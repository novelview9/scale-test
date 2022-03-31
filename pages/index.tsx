import { serialHandler } from "utils/serial-handler";
import { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';


const IndexPage = () => {
  const [data, setData] = useState<any>(["test"]);
  const { lastMessage, readyState } = useWebSocket("ws://127.0.0.1:2012");
  useEffect(() => {
    console.log(readyState)
  }, [readyState]);
  useEffect(() => {
    setData((prev) => [...prev, lastMessage]);
  }, [lastMessage]);
  const getData = async () => {
    setData((prev) => [...prev, 'wow']);
  };
  const clearData = async () => {
    setData([])
  };
  return (
    <>
      <div>
        <input>{lastMessage}</input>
        <button onClick={getData}>getData</button>
        <button onClick={clearData}>clearData</button>
      </div>
      <div>
        {data.map((line) => (
          <p>{line}</p>
        ))}
      </div>
    </>
  );
};

export default IndexPage;
