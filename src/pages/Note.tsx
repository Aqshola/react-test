import { Spin, Result, Button } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetail from "../hooks/note/useDetail";
import supabase from "../supa/supabase";

type Props = {};

const Note = (props: Props) => {
  const { id } = useParams();
  const [getDetail, data, loading, error] = useDetail();

  useEffect(() => {
    getDetail(id || "");
  }, []);

  return (
    <>
      {loading && <Spin />}
      {error.status && (
        <Result
          status="warning"
          title={"Sorry, your note is not found"}
          extra={
            <Button type="primary" href="/">
              Go Back
            </Button>
          }
        />
      )}
      {data && !loading && !error.status && (
        <div>
          <Title id="note-title">{data.title}</Title>
          <Text id="note-content">{data.content}</Text>
        </div>
      )}
    </>
  );
};

export default Note;
