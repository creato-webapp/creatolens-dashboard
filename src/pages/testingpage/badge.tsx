import SingleCheck from '@components/Icon/SingleCheckIcon'
import { Badge } from '@components/ui/Badge'

const BadgePage = () => {
  return (
    <>
      <Badge variant="default">
        <div className="flex items-center gap-2 text-white">
          <SingleCheck className="h-4 w-4 stroke-white " />
          <div className="text-base font-normal">{'Check'}</div>
        </div>
      </Badge>
    </>
  )
}

export default BadgePage
