import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropdownList = ({ selectHandler }) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="select customer name"
      onSelect={(eventKey) => selectHandler(eventKey)}
    >
      <Dropdown.Item eventKey="Linda">Linda</Dropdown.Item>
      <Dropdown.Item eventKey="John">John</Dropdown.Item>
      <Dropdown.Item eventKey="Smith">Smith</Dropdown.Item>
      <Dropdown.Item eventKey="Lily">Lily</Dropdown.Item>
      <Dropdown.Item eventKey="Mary">Mary</Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownList;
