import styled from 'styled-components';

export const TaskListContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TaskTitle = styled.span`
  flex-grow: 1;
  margin-right: 10px;
  color: #333;
`;

export const TaskDate = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 10px;
`;

export const TaskButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  color: #333;
  &:focus {
    outline: none;
    border-color: #ff6347;
    box-shadow: 0 0 3px #ff6347;
  }
  &::placeholder {
    color: #aaa;
  }
`;

export const Heading = styled.h1`
  color: #333; // Tmavě šedá pro lepší viditelnost na bílém pozadí
`;

export const AddTaskWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4cae4c;
  }
`;
