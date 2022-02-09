import { Button, Col, Form, Input, List, notification, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import useCreate from "../hooks/note/useCreate";
import useDelete from "../hooks/note/useDelete";
import useGet from "../hooks/note/useGet";
import useStore from "../store/zs";
import { Note } from "../types/type";

const Home = () => {
  const user = useStore<any>((state) => state.auth.user);
  const [formNote, setformNote] = useState({
    title: "",
    content: "",
  });

  const [getNoteList, noteList, loading] = useGet();
  const [dataNote, setdataNote] = useState<Note[] | any>([]);
  const [deleteNote, errorDelete] = useDelete();
  const [createNote, errorInsert] = useCreate();

  useEffect(() => {
    getNoteList(user.id);
  }, []);

  useEffect(() => {
    setdataNote(noteList);
  }, [noteList]);

  const formChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setformNote({ ...formNote, [e.target.name]: e.target.value });
  };

  const initDeleteNote = (id: string) => {
    deleteNote(id);

    if(!errorDelete.status){
      setdataNote(dataNote.filter((note: Note) => note.id !== id));
      notification["success"]({
        duration: 5,
        message: "Delete note success",
      });
    }else{
      notification["warning"]({
        duration: 5,
        message: errorDelete.message,
      });
    }
    
  };

  const initInsertNote = () => {
    createNote(formNote.title, formNote.content, user.id);

    
    setdataNote([formNote, ...dataNote]);

    notification["success"]({
      duration: 5,
      message: "Create note success",
    });

    setformNote({
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <Title>Note</Title>

      <Form
        wrapperCol={{ span: "8" }}
        onFinish={initInsertNote}
        aria-label="note form"
      >
        <Form.Item>
          <Input
            id="title-input"
            value={formNote.title}
            name="title"
            required
            placeholder="Insert Title Note ..."
            onChange={formChange}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            id="content-input"
            value={formNote.content}
            name="content"
            showCount
            rows={4}
            autoSize={false}
            placeholder="Insert Note Content ..."
            onChange={formChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            id="add-note-btn"
            style={{ float: "right" }}
            type="primary"
            htmlType="submit"
          >
            Submit Note
          </Button>
        </Form.Item>
      </Form>

      <Title level={4}>List Note</Title>

      <Row>
        <Col span={24}  md={{span:8}}>
          <List
            loading={loading}
            id="note-list"
            bordered
            dataSource={dataNote}
            renderItem={(item: Note) => (
              <List.Item key={item.id}>
                <a href={`/note/${item.id}`}>{item.title}</a>
                <Button
                  size="small"
                  type="primary"
                  danger
                  onClick={() => initDeleteNote(item.id)}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
