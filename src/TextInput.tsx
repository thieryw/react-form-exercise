import { memo } from "react";
import { makeStyles } from "./theme";
import { useFormState, useFormContext } from "react-hook-form";
import { Error } from "./utils/Errors";

type TextInputProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    name: string;
    id: string;
    ariaLabel: string;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    patternErrorMessage?: string;
    maxLengthErrorMessage?: string;
    minLengthErrorMessage?: string;
    requiredErrorMessage?: string;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
};

export const TextInput = memo((props: TextInputProps) => {
    const {
        ariaLabel,
        required,
        maxLength,
        maxLengthErrorMessage,
        requiredErrorMessage,
        minLength,
        minLengthErrorMessage,
        pattern,
        patternErrorMessage,
        name,
        id,
        autoComplete,
        className,
        placeholder = name,
    } = props;

    const { control, register } = useFormContext();

    const { errors } = useFormState({ control });

    const { classes, cx } = useStyles(void { props });

    return (
        <div className={cx(classes.root, className)}>
            <h4>
                {required !== undefined && "*"} {name}
            </h4>

            <input
                className={classes.input}
                type="text"
                aria-label={ariaLabel}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...register(props.id, {
                    required,
                    maxLength,
                    minLength,
                    pattern,
                })}
            />

            <Error
                possibleErrors={[
                    {
                        "type": "required",
                        "message": requiredErrorMessage ?? "Field is required !",
                    },
                    {
                        "type": "maxLength",
                        "message": maxLengthErrorMessage ?? "Input exceeds max length !",
                    },
                    {
                        "type": "minLength",
                        "message": minLengthErrorMessage ?? "Input does not meet min length !",
                    },
                    {
                        "type": "pattern",
                        "message": patternErrorMessage ?? "Input does not match required pattern !",
                    },
                ]}
                errors={errors}
                inputId={id}
            />
        </div>
    );
});

const useStyles = makeStyles()({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
        "width": "100%",
    },
    "input": {
        "padding": 10,
    },
    "errorMsg": {
        "color": "red",
    },
});
