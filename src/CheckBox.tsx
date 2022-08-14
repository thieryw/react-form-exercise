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
    dependentElements?: ReactNode;
};

export const Checkbox = memo((props: CheckboxProps) => {
    const { className, ariaLabel, name, isChecked, id, dependentElements } = props;

    const [areDependentInputsDisplayed, setAreDependentInputsDisplayed] = useState(isChecked);

    const { unregister, register } = useFormContext();

    const onClick = useConstCallback(() => {
        if (dependentElements === undefined) {
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
                        dependentElements === undefined || !areDependentInputsDisplayed
                            ? id
                            : `${id}.value`,
                    )}
                />
            </div>

            {dependentElements !== undefined && areDependentInputsDisplayed && dependentElements}
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
