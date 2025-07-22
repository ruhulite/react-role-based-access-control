import {useState} from 'react';
import Select from "react-select";

const UserPermissionForm = ({onSubmitSuccess, userData, error, message}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermission, setSelectedPermission] = useState(null);


    const roles= [
        {
            id: '001',
            name: 'Super Admin'
        },
        {
            id: '002',
            name: 'Admin'
        },
        {
            id: '003',
            name: 'User'
        }
    ];

    const roleOptions = roles.map(role => {
        return { id: role.id, value: role.name, label: role.name }
    });

    const permissions= [
        {
            id: '001',
            name: 'Can view'
        },
        {
            id: '002',
            name: 'Can edit'
        },
        {
            id: '003',
            name: 'Can delete'
        }
    ];

    const permissionOptions = permissions.map(permission => {
        return { value: permission.name, label: permission.name }
    });

    const userOptions = userData.map(user => {
        return { value: user.email, label: user.email }
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const findUser = userData.find(user => user.email === selectedUser.value)

        let permissions = [];
        selectedPermission.map(permission => {
            permissions.push(permission.value);
        })

        onSubmitSuccess({id: findUser.id, data: {
                ...findUser,
                role: selectedRole.value,
                permissions
            }})

    }


    return (
        <form
            className="bg-white rounded-lg shadow-sm width-full max-w-sm max-auto pl-6 pr-6 pb-6"
            onSubmit={handleSubmit}
        >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-medium text-gray-900">
                    Set User Role and Permission
                </h2>
            </div>
            <hr className="text-gray-200 mt-6" />
            <div className="pt-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">User List</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={userOptions}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Roles</label>
                    <Select
                        defaultValue={selectedRole}
                        onChange={setSelectedRole}
                        options={roleOptions}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Permissions</label>
                    <Select
                        defaultValue={selectedPermission}
                        onChange={setSelectedPermission}
                        options={permissionOptions}
                        isMulti
                    />
                </div>
                {error && (<p className="text-red-500 text-center text-sm mb-3">{error}</p>)}
                {message && (<p className="text-green-600 text-center text-sm mb-3">{message}</p>)}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default UserPermissionForm;