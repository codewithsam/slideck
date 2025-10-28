"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@workspace/ui/components/input-group";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";

interface DeckFormData {
  title: string;
  description: string;
}

export default function NewDeckPage() {
  const router = useRouter();
  const create = useMutation(api.decks.create);
  const [isCreating, setIsCreating] = useState(false);

  const [deckFormData, setDeckFormData] = useState<DeckFormData>({
    title: "",
    description: "",
  });

  const handleDeckFormFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setDeckFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeckFormSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsCreating(true);
    create({ title: deckFormData.title, description: deckFormData.description })
      .then((deckId) => {
        router.push(`/dashboard/decks/${deckId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleDeckFormReset = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setDeckFormData({
      title: "",
      description: "",
    });
  };
  return (
    <div className="max-w-full p-10 flex justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create New Deck</CardTitle>
          <CardDescription>Add basic information to create a new Deck</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-new-deck">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-new-deck-title">Deck Title</FieldLabel>
                <Input
                  name="title"
                  id="form-new-deck-title"
                  placeholder="My New Presentation Deck"
                  autoComplete="off"
                  value={deckFormData.title}
                  onChange={handleDeckFormFieldChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-new-deck-description">Deck Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="form-new-deck-description"
                    placeholder="some basic description of the deck"
                    rows={6}
                    name="description"
                    className="min-h-24 resize-none"
                    value={deckFormData.description}
                    onChange={handleDeckFormFieldChange}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums"></InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>You will be the owner of this deck by default</FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={(evt) => handleDeckFormReset(evt)}>
              Reset
            </Button>
            <Button type="submit" form="form-new-deck" onClick={(evt) => handleDeckFormSubmit(evt)}>
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
