import React from "react";
import ReactDOM from "react-dom/client";
import { Form } from "react-form-exercise/Form";
import { TextInput } from "react-form-exercise/TextInput";
import { Checkbox } from "react-form-exercise/CheckBox";
import { OptionList } from "react-form-exercise/OptionList";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <Form
            title="title"
            onSubmit={data => console.log(data)}
            body={
                <>
                    <TextInput
                        name="nom"
                        id="nom"
                        ariaLabel="nom"
                        autoComplete="family-name"
                        required={true}
                        requiredErrorMessage="Le champ est obligatoire"
                    />
                    <TextInput
                        name="prenom"
                        id="prenom"
                        ariaLabel="prenom"
                        autoComplete="given-name"
                        required={true}
                        requiredErrorMessage="Le champ est obligatoire"
                    />
                    <Checkbox
                        ariaLabel="Etes vous majeur ?"
                        name="Etes vous majeur ?"
                        id="18+"
                        dependentElements={
                            <>
                                <OptionList
                                    id="18+.model"
                                    name="quel est votre model de voiture ?"
                                    items={["mercedes", "porch", "lexus", "B M W"]}
                                />
                            </>
                        }
                    />
                </>
            }
            submitButtonText="soumetre"
        />
    </React.StrictMode>,
);
