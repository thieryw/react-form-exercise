import { memo, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { makeStyles } from "./theme";

type FormProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    body?: ReactNode;
    title?: ReactNode;
    onSubmit: (data: FieldValues) => void;
    submitButtonText?: string;
};

export const Form = memo((props: FormProps) => {
    const methods = useForm();
    const { onSubmit, body, submitButtonText, title, className } = props;
    const { classes, cx } = useStyles(void { props });

    return (
        <FormProvider {...methods}>
            <form
                className={cx(classes.root, className)}
                onSubmit={methods.handleSubmit(data => onSubmit(data))}
            >
                {title !== undefined &&
                    (() => {
                        if (typeof title === "string") {
                            return <h2>{title}</h2>;
                        }
                        return title;
                    })()}
                {body !== undefined && body}

                <input className={classes.submit} type="submit" value={submitButtonText ?? "submit"} />
            </form>
        </FormProvider>
    );
});

const useStyles = makeStyles()({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "flex-start",
    },
    "submit": {
        "marginTop": 50,
    },
});
