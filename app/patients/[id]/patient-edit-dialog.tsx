import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PatientEditDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  mrn: string | undefined;
  onEdit: (newName: string, newMrn: string) => Promise<void>;
  isMutating: boolean;
};

export const PatientEditDialog = ({
  open,
  setOpen,
  name,
  mrn = "",
  onEdit,
  isMutating,
}: PatientEditDialogProps) => {
  const [newName, setNewName] = useState(name);
  const [newMrn, setNewMrn] = useState(mrn);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  useEffect(() => {
    setNewMrn(mrn);
  }, [mrn]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Patient</DialogTitle>
          <DialogDescription>
            Update the patient&apos;s details
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newName) {
              return;
            }

            await onEdit(newName, newMrn);
            setOpen(false);
          }}
        >
          <Input
            placeholder="New name"
            defaultValue={name}
            name="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="pt-2"></div>
          <Input
            placeholder="New MRN"
            defaultValue={mrn ?? ""}
            name="mrn"
            value={newMrn}
            onChange={(e) => setNewMrn(e.target.value)}
          />
          <Button
            className="mt-4 w-full rounded-full py-6 text-base"
            variant={"outline"}
            type="submit"
            disabled={newName === name && mrn === newMrn && isMutating}
          >
            {isMutating ? "Updating" : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const toWordCase = (resource: string) => {
  return resource[0].toUpperCase() + resource.slice(1);
};
