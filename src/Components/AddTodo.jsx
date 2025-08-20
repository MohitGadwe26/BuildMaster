
function AddTodo(){
return(
  <div className="todolist-container ">
   <div className="row my-row">
  <div className="col-4">
    <input type="text" className="form-control" placeholder="Enter todo Here" aria-label="Type"/>
  </div>
  <div className="col-sm-3">
    <input type="date" className="form-control" placeholder="State"/>
  </div>
  <div className="col-sm-2">
  <button type="button" className="btn btn-success my-botton">Add</button>
  </div>
</div>
  </div>
);
}
export default AddTodo