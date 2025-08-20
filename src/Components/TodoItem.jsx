import styles from "./TodoItem.module.css";

function TodoItem({todoName,todoDate}){
 return(
  <div className="todolist-container">
  <div className="row my-row item" >
 <div className="col-4">{todoName}</div>
 <div className="col-3">{todoDate}</div>
 <div className="col-2">
 <button type="button" className="btn btn-danger my-botton">Delete</button>
 </div>
</div>
 </div>
);
}
export default TodoItem