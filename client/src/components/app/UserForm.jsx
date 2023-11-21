import { Grid } from '@mui/material';
import React, { useRef } from 'react';


// to display the form to create user
export default function UserForm() {

    // now create reference object to fetch values
    const firstName = useRef(null);
    const lastName = useRef(null);
    const gender = useRef(null);
    const email = useRef(null);
    const available = useRef(null);
    const avatar = useRef(null);

    // to acces the form data
    const getFormData = (e) => {
        console.log(email.current.value);
        console.log(available.current.checked);
        console.log(gender?.current?.value);
        console.log(avatar?.current?.files[0]);

    };

    return (
        <div className='container mt-5'>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input ref={firstName} type="text" className="form-control" id="first-name" placeholder="First Name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input ref={lastName} type="text" className="form-control" id="last-name" placeholder="Last Name" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input ref={email} type="email" className="form-control" id="email" placeholder='Email' />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Gender</label>
                        <select ref={gender} id="inputGender" className="form-control">
                            <option disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Agender">Agender</option>
                            <option value="Bigender">Bigender</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Avatar</label>
                        <input ref={avatar} type="file" className="form-control-file" id="exampleFormControlFile1" formEncType='multipart/form-data' />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input ref={available} className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Is User Available?
                        </label>
                    </div>
                </div>
                <button onClick={getFormData} type="button" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
