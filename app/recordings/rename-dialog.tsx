import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

type RenameDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  onEdit: (newName: string) => void;
};

export const RenameDialog = ({
  open,
  setOpen,
  name,
  onEdit,
}: RenameDialogProps) => {
  const [newName, setNewName] = useState(name);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Recording</DialogTitle>
          <DialogDescription>
            Rename the recording to a new name.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newName) {
              return;
            }

            onEdit(newName);
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
          <Button
            className="mt-4 w-full rounded-full py-6 text-base"
            variant={"outline"}
            type="submit"
            disabled={newName === name}
          >
            Rename
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};