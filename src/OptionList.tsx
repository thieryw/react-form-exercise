import { memo, ReactNode, useEffect, useState } from "react";
import { Menu, MenuButton, MenuButtonArrow, MenuItem, useMenuState } from "ariakit/menu";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { makeStyles } from "./theme";
import { useFormContext } from "react-hook-form";
import { assert } from "tsafe/assert";

export type OptionListProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    id: string;
    name: string;
    items: string[];
    defaultSelectedItem?: string;
    dependentElements?: Record<string, ReactNode>;
};

export const OptionList = memo((props: OptionListProps) => {
    const { className, id, items, name, defaultSelectedItem = items[0], dependentElements } = props;

    const dependentElementNames =
        dependentElements === undefined ? undefined : Object.keys(dependentElements);

    const [currentItem, setCurrentItem] = useState(defaultSelectedItem);
    const menu = useMenuState({
        "gutter": 8,
    });

    const { register, setValue } = useFormContext();

    useEffect(() => {
        register(id);
        setValue(id, defaultSelectedItem);
    }, [id, items, register, setValue, defaultSelectedItem]);

    const selectItemFactory = useCallbackFactory(([item]: [string]) => {
        setCurrentItem(item);
        setValue(id, item);
    });

    const { classes, cx } = useStyles(void { props });

    return (
        <div className={cx(classes.root, className)}>
            <div className={classes.labelAndMenuWrapper}>
                <label>
                    <h5>{name} :</h5>
                </label>
                <MenuButton className={classes.button} state={menu}>
                    {currentItem}
                    <MenuButtonArrow />
                </MenuButton>
                <Menu className={classes.menu} state={menu}>
                    {items.map(item => (
                        <MenuItem
                            className={classes.menuItem}
                            key={item}
                            onClick={selectItemFactory(item)}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            {dependentElementNames !== undefined &&
                dependentElementNames.map(name => {
                    assert(dependentElements !== undefined);
                    if (name !== currentItem) {
                        return;
                    }
                    return <div key={name}>{dependentElements[name]}</div>;
                })}
        </div>
    );
});

const useStyles = makeStyles()({
    "root": {
        "display": "flex",
        "flexDirection": "column",
    },
    "labelAndMenuWrapper": {
        "display": "flex",
        "gap": 10,
    },
    "button": {
        "display": "flex",
        "alignItems": "center",
        "minWidth": 200,
        "justifyContent": "space-between",
    },
    "menu": {
        "border": "solid grey 1px",
        "boxShadow": "5px 5px 15px 5px rgba(0,0,0,0.18)",
        "backgroundColor": "grey",
        "borderRadius": 3,
    },
    "menuItem": {
        "padding": "10px 5px 10px 5px",
        "minWidth": 200,
        ":hover, :focus-visible": {
            "backgroundColor": "lightblue",
            "outline": "none",
        },
    },
});
