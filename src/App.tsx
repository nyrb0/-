import { useState } from "react";
import styled from "styled-components";
import List from "./conponents/List"; // Исправлено: "conponents" на "components"
import { ListI } from "./types/List.type";
import Add from "./conponents/UI/Add";
import "./App.css";
import Drawer from "./conponents/UI/Drawer";
import Input from "./conponents/UI/Input";
import Button from "./conponents/UI/Button";
import Modal from "./conponents/UI/Modal";

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;
const Position = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

function App() {
  const [list, setList] = useState<ListI[]>([
    {
      title: "Урок 3434 Физика",
      desc: "nsjvbslfvbjsbdhivb  bsjvbvhbdhvbsfhdvbsd   fsjhvsjvbfsdhv",
      id: 1,
    },
    {
      title: "Урок 3434 Алгебра",
      desc: "nsjvbslfvbjsbdhivb  bsjvbvhbdhvbsfhdvbsd   fsjhvsjvbfsdhv",
      id: 2,
    },
    {
      title: "Урок 3434 Матем",
      desc: "nsjvbslfvbjsbdhivb  bsjvbvhbdhvbsfhdvbsd   fsjhvsjvbfsdhv",
      id: 3,
    },
  ]);
  const [task, setTask] = useState({ title: "", desc: "" });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [edit, setEdit] = useState({ title: "", desc: "", id: 0 });
  const [prev, setPrev] = useState<ListI | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [ok, setOk] = useState(false);
  const [delId, setDelId] = useState<number | null>();

  const changeTaskTitle = (v: string) => {
    setTask((p) => ({ ...p, title: v }));
  };
  const changeTaskDesc = (v: string) => {
    setTask((p) => ({ ...p, desc: v }));
  };
  const chageEditTitle = (v: string) => {
    setEdit((p) => ({ ...p, title: v }));
  };
  const chageEditDesc = (v: string) => {
    setEdit((p) => ({ ...p, desc: v }));
  };

  const addToTask = () => {
    if (task.desc.includes("!") || task.title.includes("!")) {
      setErr(`В тексте не должен содержать символ "!"`);
      return;
    }
    if (task.title && task.desc) {
      const newTask = { ...task, id: list.length + 1 };
      setList((prev) => [...prev, newTask]);
      setTask({ title: "", desc: "" });
      setOpen(false);
      setErr(null);
    }
  };

  const toEdit = () => {
    if (!edit) return;
    else if (edit.desc.includes("!") || edit.title.includes("!")) {
      setErr(`В тексте не должен содержать символ "!"`);
      return;
    } else if (prev === edit) {
      setOpenEdit(false);
      setPrev(null);
      setErr(null);
      return;
    }
    const filter = list.map((f) => {
      if (f.id === edit.id) return (f = edit);
      return f;
    });

    setList(filter);
    setPrev(null);
    setErr(null);
    setOpenEdit(false);
  };

  const deleteTask = () => {
    if (delId !== null) {
      const newList = list.filter((f) => f.id !== delId);
      setList(newList);
      setDelId(null);
    }
    setIsDelete(false);
  };

  const deleteOk = (id: number) => {
    setDelId(id);
    setIsDelete(true);
  };

  const toOpenEdit = (l: ListI) => {
    setOpenEdit(true);
    setEdit(l);
    setPrev(l);
  };

  return (
    <>
      {isDelete && (
        <Modal close={() => setIsDelete(false)}>
          <div className="tasks_warning">Действительно хотите удалить?</div>
          <div className="tasks_btns">
            <Button onClick={deleteTask}>Да</Button>
            <Button onClick={() => setIsDelete(false)}>Нет</Button>
          </div>
        </Modal>
      )}
      {openEdit && (
        <Modal close={() => setOpenEdit(false)}>
          <div className={"tasks_text"}>Добавить новую задачу</div>
          <div className={"tasks_title"}>
            <Input
              value={edit.title}
              change={chageEditTitle}
              placeholder="Название"
            />
          </div>
          <div className="tasks_task">
            <Input
              value={edit.desc}
              change={chageEditDesc}
              placeholder="Задача"
            />
          </div>
          <div className="tasks_warning">{err}</div>
          <div className="tasks_btns">
            <Button dis={!edit.title || !edit.desc} onClick={toEdit}>
              Сохранить
            </Button>
            <Button onClick={() => setOpenEdit(false)}>Отменить</Button>
          </div>
        </Modal>
      )}
      <div className="tasks">
        <Container>
          {open && (
            <Drawer isOpen={open} close={() => setOpen(false)}>
              <div className={"tasks_text"}>Добавить новую задачу</div>
              <div className={"tasks_title"}>
                <Input
                  value={task.title}
                  change={changeTaskTitle}
                  placeholder="Название"
                />
              </div>
              <div className="tasks_task">
                <Input
                  value={task.desc}
                  change={changeTaskDesc}
                  placeholder="Задача"
                />
                <div className="tasks_warning">{err}</div>
                <div className="tasks_btn">
                  <Button dis={!task.title || !task.desc} onClick={addToTask}>
                    Добавить
                  </Button>
                </div>
              </div>
            </Drawer>
          )}
          <ul>
            {list.map((l) => (
              <div className="list" key={l.id}>
                <List list={l} deleteList={deleteOk} toEdit={toOpenEdit} />
              </div>
            ))}
          </ul>
        </Container>
        <Position>
          <Add onClick={() => setOpen(true)} />
        </Position>
      </div>
    </>
  );
}

export default App;
