import { Grid } from '@mui/material';
import React from 'react';


// to display the form to create user
export default function UserForm() {
    return (
        <div className='container mt-5'>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="first-name" placeholder="First Name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" className="form-control" id="last-name" placeholder="Last Name" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Gender</label>
                        <select id="inputGender" className="form-control">
                            <option>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Agender</option>
                            <option>Bigender</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Avatar</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" formEncType='multipart/form-data' />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Is User Available?
                        </label>
                    </div>
                </div>
                <button type="button" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
