import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../redux/store';
import { addTodo } from '../redux/action';
import { remove } from '../redux/action';
import { complete } from '../redux/action';
import { taskTrash } from '../redux/action';
import { restore } from '../redux/action';
import { empty } from '../redux/action';

import swal from 'sweetalert';

export class ui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  addTask = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  submitTask = () => {
    if (this.state.value == '') {
      swal('Please add a task', '', 'warning');
    } else {
      let obj = {
        id: Date.now(),
        item: this.state.value,
        flag: false,
        trash: false,
      };
      this.props.addTodo(obj);

      this.setState({
        value: '',
      });
    }
  };
 
  render(props) {
    let inCompleted = [],
      completed = [],
      trash = [];
    let arr = store.getState().list;

    arr.map((ele) => {
      if (ele.flag) {
        completed.push(ele);
      } else if (!ele.trash) {
        inCompleted.push(ele);
      }
    });
    arr.map((ele) => {
      if (ele.trash) {
        trash.push(ele);
      }
    });

    return (
      <div>
      <h1 className='bg-primary text-center text-white p-3'>TODO-LIST </h1>

      <div className='container my-5'>
        <div class='input-group input-group-lg my-4'>
          <div class='input-group-prepend'>
            <span class='input-group-text' id='inputGroup-sizing-lg'>
              Add Task
            </span>
          </div>
          <input
            type='text'
            class='form-control'
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
            value={this.state.value}
            onChange={this.addTask}
          />
        </div>

        <div className='d-flex justify-content-between'>
          <button
            type='button'
            class='btn btn-danger btn-lg px-5 my-4 '
            data-toggle='modal'
            data-target='#exampleModal'
          >
            Trash<i class='fas fa-trash-alt mx-3'></i>
          </button>

          <div
            class='modal fade'
            id='exampleModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Deleted Incompleted Task
                  </h5>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div class='modal-body'>
                  {trash.map((ele) => {
                    return (
                      <div className='d-flex justify-content-between bg-danger my-4 text-white'>
                        <span className='px-3 h3'>{ele.item}</span>
                        <div>
                          <button
                            className='btn  bg-danger text-white py-2'
                            onClick={() => this.props.restoreTask(ele.id)}
                          >
                            <i class='fas fa-trash-restore fa-2x mx-2'></i>
                          </button>
                          <button
                            className='btn  bg-danger text-white py-2'
                            onClick={() => this.props.removeTask(ele.id)}
                          >
                          
                            <i class='fas fa-trash-alt fa-2x mx-2'></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  <button
                    type='button'
                    class='btn btn-primary'
                    onClick={this.props.emptyTrash}
                  >
                    Empty Trash
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type='button'
            class='btn btn-primary btn-lg px-5 my-4 '
            onClick={this.submitTask}
          >
            Submit
          </button>
        </div>
        <div>
          {inCompleted.map((ele, i) => {
            return (
              <div key={ele.id}>
                {i == 0 ? (
                  <h2 className='text-center'>Incompleted Task</h2>
                ) : (
                  ''
                )}

                <div className='d-flex justify-content-between  bg-danger my-4 text-white'>
                    <div className='align-items-center'>
                  <input
                    type='checkbox'
                    className='m-3'
                    onChange={() => this.props.completedTask(ele.id)}
                  />
                  <span className='px-3 h3'>{ele.item}</span>
                    </div>
                  <button
                    className='btn  bg-danger text-white'
                    onClick={() => this.props.taskTrash(ele.id)}
                  >
                    <i class='fas fa-trash-alt fa-2x'></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {completed.map((ele, i) => {
            return (
              <div>
                {i == 0 ? <h2 className='text-center'> Completed Task</h2> : ''}

                <div className='d-flex justify-content-between  bg-success my-4 text-white'>
                  <div  className='align-items-center'>
                  <i class='fas fa-check m-3'></i>
                  <strike className='px-3 h3'>{ele.item}</strike>

                  </div>

                  <button
                    className='btn  bg-success text-white'
                    onClick={() => this.props.removeTask(ele.id)}
                  >
                    <i class='fas fa-trash-alt fa-2x'></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
  
    );
  }
}

const mapStateToProps = (state) => ({
  arr: state.list,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => dispatch(addTodo(payload)),
  taskTrash: (payload) => dispatch(taskTrash(payload)),
  restoreTask: (payload) => dispatch(restore(payload)),
  emptyTrash: (payload) => dispatch(empty()),
  removeTask: (payload) => dispatch(remove(payload)),
  completedTask: (payload) => dispatch(complete(payload))


});

export default connect(mapStateToProps, mapDispatchToProps)(ui);
