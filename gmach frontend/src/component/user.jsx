import { Link } from "react-router-dom";
const User = ({ user, ondelete }) => {
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.takemoney}</td>
      <td>{user.payments}</td>
          <td>
        <button onClick={ondelete} className="btn btn-danger">
          מחק
        </button>
      </td>
      <td>
        <Link className="btn btn-success" to={`/users/edit/${user._id}`}> ערוך </Link>
      </td>
    </tr>
  );
};

export default User;
