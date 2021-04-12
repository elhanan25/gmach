
import { Link } from "react-router-dom";
const Please = ( {pleaser, ondelete} ) => {
  return (
    <tr>
      <td>{pleaser._id}</td>
      <td>{pleaser.text}</td>
      <td>{pleaser.notes}</td>
      <td>{pleaser.status}</td>
      
      <td>
        <button onClick={ondelete} className="btn btn-danger">
          מחק
        </button>
      </td>
      
      <td>
        <Link className="btn btn-success" to={`/updateplease/${pleaser._id}`}> ערוך </Link>


      </td>
    </tr>
  );
};

export default Please;