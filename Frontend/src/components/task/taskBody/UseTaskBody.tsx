import {
  Doer,
  IMessage,
  Priority,
  Task,
  TaskProperties,
} from "../../../types/Task";
import { UseTaskApi } from "../UseTaskApi";
import { useEffect, useRef, useState } from "react";
import { Comment } from "../chat/Comment";

interface Props {
  id: number;
  projectId: number;
  refreshPriority: (value: Priority) => void;
}
function UseTaskBody({ id, projectId, refreshPriority }: Props) {
  const { handleUpdateTaskPriority, getMessages, insertMessage } = UseTaskApi();
  const [taskProperties, setTaskProperties] = useState<TaskProperties>();
  const [messages, setMessages] = useState<IMessage[]>();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [doers, setDoers] = useState<Doer[]>();
  const {
    getTaskProperties,
    updateTaskProperties,
    getAllDoersForProject,
    handleUpdateTaskDoer,
  } = UseTaskApi();

  useEffect(() => {
    getProperties(id, projectId);
    getAllDoers(projectId);
    setMessageList(id);
  }, []);

  const setMessageList = async (id: number) => {
    setMessages([...(await getMessages(id))]);
  };
  const getProperties = async (id: number, projectId: number) => {
    const data = await getTaskProperties(id, projectId);
    if (data) {
      setTaskProperties(data);
    }
  };

  const getAllDoers = async (projectId: number) => {
    const doers = await getAllDoersForProject(projectId);
    setDoers([...doers]);
  };

  const doersOptions = () => {
    if (doers) {
      return doers.map((doer) => {
        return (
          <option key={doer.id} value={doer.id}>
            {doer.email}
          </option>
        );
      });
    }
  };

  const changeDoer = async (target: HTMLSelectElement) => {
    try {
      const newDoer = Number.parseInt(target.value);
      if (
        await handleUpdateTaskDoer({
          DoerId: newDoer,
          id: id,
        } as Task)
      ) {
        setTaskProperties((prev) => ({
          ...prev!,
          DoerId: newDoer,
        }));
      }
    } catch (error) {}
  };
  const priorityTaskOptions = () => {
    const sortTypes = Object.values(Priority);
    const half = Math.ceil(sortTypes.length / 2);
    const firstHalf = sortTypes.slice(0, half);
    const mapper = [
      { name: "LOW", value: "Low ↓" },
      { name: "MEDIUM", value: "Medium →" },
      { name: "HIGH", value: "High ↑" },
      { name: "CRITICAL", value: "Critical !" },
    ];

    return firstHalf.map((value, index) => {
      const text = mapper.map((x) => {
        if (x.name === value.toString()) {
          return value.toString().replace(x.name, x.value);
        }
      });
      return (
        <option key={index} value={index}>
          {text}
        </option>
      );
    });
  };

  const changeTaskPriority = async (target: HTMLSelectElement) => {
    try {
      const pickedPriorityAsNumber = Number.parseInt(target.value);
      if (
        await handleUpdateTaskPriority({
          priority: pickedPriorityAsNumber,
          id: id,
        } as Task)
      ) {
        setTaskProperties((prev) => ({
          ...prev!,
          priority: pickedPriorityAsNumber,
        }));
        refreshPriority(pickedPriorityAsNumber);
      }
    } catch (error) {}
  };

  const handleSaveContent = async (content: string | undefined) => {
    if (content === undefined && taskProperties === undefined) {
      return;
    }
    taskProperties!.body = content!;
    const data = await updateTaskProperties(taskProperties!);
    if (data) {
      setTaskProperties(data);
    }
  };

  const handleAddComment = async () => {
    if (ref === null || ref.current === null) {
      return;
    }
    const commnet = ref.current!.value.trim();
    if (commnet === "") {
      return;
    }
    console.log(commnet);
    if (await insertMessage(id, commnet)) {
      setMessageList(id);
    }
    ref.current!.value = "";
  };

  const CommentList = () => {
    let lastId = 0;
    return messages?.map((m) => {
      let color: 1 | 0 = 0;
      let possition = "right";
      if (lastId !== 0 && lastId !== m.id) {
        color = 1;
        possition = "left";
      }
      lastId = m.id;
      return (
        <Comment
          key={m.id}
          color={color}
          possition={possition}
          user={m.user}
          time={m.added}
          message={m.message}
        />
      );
    });
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>)=> {
    if (e.code === "Enter") {
      await handleAddComment();      
    }
  }
  return {
    priorityTaskOptions,
    changeTaskPriority,
    taskProperties,
    handleSaveContent,
    doersOptions,
    changeDoer,
    ref,
    handleAddComment,
    CommentList,
    handleKeyDown,
  };
}

export default UseTaskBody;
