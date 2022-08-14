import { memo } from "react";
import { makeStyles } from "../theme";
import { getError } from "../tools/getError";

export type ErrorProps = {
    possibleErrors: {
        type: string;
        message: string;
    }[];
    inputId: string;
    errors: Parameters<typeof getError>["1"];
};

export const Error = memo((props: ErrorProps) => {
    const { possibleErrors, errors, inputId } = props;
    const { classes } = useStyles();
    return (
        <>
            {possibleErrors.map(({ message, type }) => {
                const error = getError(inputId, errors);
                if (error === undefined) {
                    return null;
                }
                return (
                    (error as any).type === type && (
                        <div key={message} className={classes.root}>
                            <strong className={classes.description}>{message}</strong>
                        </div>
                    )
                );
            })}
        </>
    );
});

const useStyles = makeStyles()({
    "root": {
        "border": "solid red 1px",
        "wordBreak": "break-all",
    },
    "description": {
        "color": "red",
    },
});
