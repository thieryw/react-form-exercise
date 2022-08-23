import { memo, ReactNode, useState } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { makeStyles } from "./theme";
import { useFormContext } from "react-hook-form";

export type CheckboxProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    name: string;
    id: string;
    ariaLabel: string;
    isChecked?: boolean;
    dependentElement?: ReactNode;
};

export const Checkbox = memo((props: CheckboxProps) => {
    const { className, ariaLabel, name, isChecked, id, dependentElement } = props;

    const [areDependentInputsDisplayed, setAreDependentInputsDisplayed] = useState(isChecked);

    const { unregister, register } = useFormContext();

    const onClick = useConstCallback(() => {
        if (dependentElement === undefined) {
            return;
        }
        setAreDependentInputsDisplayed(!areDependentInputsDisplayed);
        if (!areDependentInputsDisplayed) {
            return;
        }
        unregister(id);
    });

    const { classes, cx } = useStyles(void { props });

    return (
        <div className={cx(classes.root, className)}>
            <div className={classes.primaryInputWrapper}>
                <h4>{name}</h4>
                <input
                    type="checkbox"
                    onClick={onClick}
                    aria-label={ariaLabel}
                    checked={isChecked}
                    {...register(
                        dependentElement === undefined || !areDependentInputsDisplayed
                            ? id
                            : `${id}.value`,
                    )}
                />
            </div>

            {dependentElement !== undefined && areDependentInputsDisplayed && dependentElement}
        </div>
    );
});

const useStyles = makeStyles()({
    "root": {
        "border": "solid grey 1px",
        "padding": 10,
        "margin": "30px 0px 30px 0px",
    },
    "primaryInputWrapper": {
        "display": "flex",
    },
});
