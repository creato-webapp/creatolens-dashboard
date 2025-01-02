import { Checkbox } from '@components/ui/Checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/Table'
import Image from 'next/image'
import { Button } from '@components/ui/Button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import { Input } from '@components/ui/Input'
import { Label } from '@components/ui/Label'

export interface HistoryGridViewProps {
  data: HistoryRow[]
}

export interface HistoryRow {
  created_at: string
  id: string
  input_object: null
  is_deleted: boolean
  output_object: {
    created_at: string
    data: {
      url: string
    }
    updated_at: string
  }
  status: number
  updated_at: string
  user_id: string
}

const FallBackImage = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200">
      <span className="text-neutral-500">?</span>
    </div>
  )
}
const HistoryGridView = (props: HistoryGridViewProps) => {
  const { data } = props

  const renderRows = () => {
    return data.map((item) => (
      <TableRow key={item.id} className="">
        <TableCell className="font-medium">
          {item.output_object.data.url ? <Image src={item.output_object.data.url} alt="Image" width={40} height={40} /> : <FallBackImage />}
        </TableCell>
        <TableCell className="font-medium">{item.id}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell>
          <Checkbox className="h-5 w-5 rounded-md" checked={item.is_deleted} />
        </TableCell>
        <TableCell className="">{new Date(item.created_at).toLocaleDateString()}</TableCell>
        <TableCell className="text-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
      <TableCaption>A list of your recent invoices.</TableCaption>
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
export default HistoryGridView
