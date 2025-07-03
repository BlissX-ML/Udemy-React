import { useState } from 'react'

export default function PlayerInfo({ initialName, symbol, isActive, isChangedName }) {
    const [isEdit, setIsEdit] = useState(false);
    const [realName, setRealName] = useState(initialName);

    function handleClickEdit() {
        // setIsEdit(!isEdit ? true : false);
        setIsEdit((isEdit) => !isEdit)

        if (isEdit) {
            isChangedName(symbol, realName)
        }
    }

    function handleInputChange(event) {
        setRealName(event.target.value)
    }

    return (
        <ul id="infoUl" className={isActive ? 'active' : null}>
            {
                !isEdit
                    ? <li><span>{realName}</span></li>
                    : <input type="text" placeholder={realName} required onChange={handleInputChange} />
            }
            <li><span>{symbol}</span></li>
            <button onClick={handleClickEdit}>
                {
                    !isEdit ? 'Edit' : 'Save'
                }
            </button>
        </ul>
    )
}