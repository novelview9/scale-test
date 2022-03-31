import { serialHandler } from "utils/serial-handler";
import { useState } from "react";

const IndexPage = () => {
  const [data, setData] = useState(["test"]);
  const onClick = async () => {
    await serialHandler.init();
  };
  const getData = async () => {
    const newData = await serialHandler.read();
    setData((prev) => [...prev, newData]);
  };
  const clearData = async () => {
    setData([])
  };
  return (
    <>
      <div>
        <input></input>
        <button onClick={onClick}>클릭</button>
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
