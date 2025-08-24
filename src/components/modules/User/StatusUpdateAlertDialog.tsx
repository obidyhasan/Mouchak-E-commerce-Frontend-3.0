import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UpdateAlertDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  selectedValue: string | null;
  selectedId: string | null;
  onConfirm: (value: string, id: string) => void;
  title?: string;
}

export default function StatusUpdateAlertDialog({
  openDialog,
  setOpenDialog,
  selectedValue,
  selectedId,
  onConfirm,
  title = "Confirm Update",
}: UpdateAlertDialogProps) {
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to change this to{" "}
            <span className="font-semibold">{selectedValue}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (selectedValue && selectedId) {
                onConfirm(selectedValue, selectedId);
              }
              setOpenDialog(false);
            }}
          >
            Yes, Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
