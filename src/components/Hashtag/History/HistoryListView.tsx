import { Checkbox } from '@components/ui/Checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table'
import Image from 'next/image'
import { Button } from '@components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import { Input } from '@components/ui/Input'
import { Label } from '@components/ui/Label'
import { HistoryRow } from '@context/HistoryContext'
import { Skeleton } from '@components/ui/Skeleton'
import { arrayOfStringsToSentence } from '@utils/index'

export interface HistoryListViewProps {
  data: HistoryRow[]
  isLoading?: boolean
}

const FallBackImage = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200">
      <span className="text-neutral-500">?</span>
    </div>
  )
}
export default function HistoryListView(props: HistoryListViewProps) {
  const { data } = props

  const renderRows = () => {
    if (props.isLoading) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell colSpan={6}>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </>
      )
    }

    return data.map((item) => (
      <TableRow key={item.id} className="">
        <TableCell className="font-medium">
          {item.output_object.data.url ? (
            <Image src={item.output_object.data.url} alt="Image" className="aspect-square object-cover" width={40} height={40} />
          ) : (
            <FallBackImage />
          )}
        </TableCell>
        <TableCell className="font-medium">{arrayOfStringsToSentence(item.labels)}</TableCell>
        <TableCell className="font-medium">{arrayOfStringsToSentence(item.hashtags)}</TableCell>
        <TableCell>
          <Checkbox className="h-5 w-5 rounded-md" checked={item.is_deleted} />
        </TableCell>
        <TableCell className="">{new Date(item.created_at).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <Table className="h-full overflow-hidden">
      <TableHeader>
        <TableRow className="text-neutral-800">
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="w-[400px]">Label</TableHead>
          <TableHead className="w-[400px]">Hashtag</TableHead>
          <TableHead className="w-[100px] text-right"></TableHead>
          <TableHead className="w-[100px] whitespace-nowrap">Created Date</TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  )
}
