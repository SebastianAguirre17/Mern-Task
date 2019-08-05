import React, { Component } from 'react';

export default class App extends Component {
    
    constructor(){
        super();
        this.state = {
            title : '',
            description : '',
            _id : '',
            tasks : []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount(){
        this.fetchTask();
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/task/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html : 'Task Updated'});
                    this.setState({
                        title : '',
                        description : '',
                        _id : ''
                    });
                    this.fetchTask();
                });
            
        }else{
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html : 'Task saved'})
                    this.setState({title : '', description : ''})
                    this.fetchTask();
                })
                .catch(err => console.error(err))
        }
    
        e.preventDefault();
    }
    
    fetchTask(){
        fetch('api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks : data });
            })
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name] : value
        })
    }

    editTask(id){
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title : data.title,
                    description : data.description,
                    _id : data._id
                })
            })
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html : 'Task Deleted'});
                    this.fetchTask();
                })
        }
    }

    render() {
        return (
            <div>
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>Mern Stack</a>
                    </div>
                </nav>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <div className='card' >
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input 
                                                    type='text' 
                                                    placeholder='Task title' 
                                                    name='title' 
                                                    onChange={this.handleChange}
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea 
                                                    placeholder='Task Description' 
                                                    className='materialize-textarea' 
                                                    name='description' 
                                                    onChange={this.handleChange}
                                                    value={this.state.description} 
                                                >   
                                                </textarea>
                                            </div>
                                        </div>
                                        <button className='btn light-blue darken-4' type='submit'>Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s12 m8'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={() => this.editTask(task._id)} className='btn light-blue darken-4'>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                        <button onClick={() => this.deleteTask(task._id)} className='btn light-blue darken-4' style={{margin : '4px'}}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
