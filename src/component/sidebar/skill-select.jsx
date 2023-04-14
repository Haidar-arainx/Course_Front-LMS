



const SkillSelect = ({select}) => {
    return (
        <select defaultValue={select}>
            <option value="all">All Levels</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
           
        </select>
    );
}
 
export default SkillSelect;