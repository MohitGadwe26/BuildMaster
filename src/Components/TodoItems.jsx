import TodoItem from "./TodoItem";

function TodoItems({todoItem}){
return(
 <>
    <div className='item-container'>
      {todoItem.map(item=> <TodoItem key={item.todoName+item.todoDate} todoName={item.todoName} todoDate={item.todoDate}></TodoItem>)}
    </div> 
 </>
);
}

export default TodoItems