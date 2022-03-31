import { serialHandler } from "utils/serial-handler";
import { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import dynamic from 'next/dynamic'

const IndexPage = () => {
  const [data, setData] = useState<any>("");
  const { lastJsonMessage } = useWebSocket("ws://127.0.0.1:2012");
    useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage)
    }
  }, [lastJsonMessage, setData]);

  const clearData = async () => {
    setData("")
  };
  return (
    <>
      <div>
        <p>weight</p>
        <input value={data} />
        <button onClick={clearData}>clearData</button>
      </div>
      </>
  );
};


export default dynamic(() => Promise.resolve(IndexPage), {
  ssr: false
})
