import React, {useState} from 'react'
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

function CheckBoxButtons({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormControl>
            {items.map(item => (
                <FormControlLabel
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item}
                    key={item}
                />
            ))}
        </FormControl>
    )
}

export default CheckBoxButtons