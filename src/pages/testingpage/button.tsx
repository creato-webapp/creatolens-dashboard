import { Button } from '@components/Button'

const ButtonPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>Primary Button</div>
        <Button.Primary loading sizes={['l', 'l', 'l']}>
          Large Button
        </Button.Primary>
        <Button.Primary sizes={['m', 'm', 'm']}>Medium Button</Button.Primary>
        <Button.Primary loading sizes={['s', 's', 's']}>
          Small Button
        </Button.Primary>
      </div>
      <div>
        <div>Neutral</div>
        <div>
          <Button.Neutral sizes={['l', 'l', 'l']}>Neutral</Button.Neutral>
          <Button.Neutral sizes={['m', 'm', 'm']}>Neutral</Button.Neutral>
          <Button.Neutral sizes={['s', 's', 's']}>Neutral</Button.Neutral>
        </div>
      </div>
      <div>
        <div>Subtle</div>
        <div>
          <Button.Subtle sizes={['l', 'l', 'l']}>Subtle</Button.Subtle>
          <Button.Subtle sizes={['m', 'm', 'm']}>Subtle</Button.Subtle>
          <Button.Subtle disabled sizes={['s', 's', 's']}>
            Subtle
          </Button.Subtle>
        </div>
      </div>
      <div>
        <div>Subtle</div>
        <div>
          <Button.Subtle icon={{ position: 'left', src: '/check.svg' }} sizes={['l', 'l', 'l']}>
            Subtle
          </Button.Subtle>
          <Button.Subtle icon={{ position: 'left', src: '/check.svg' }} sizes={['m', 'm', 'm']}>
            Subtle
          </Button.Subtle>
          <Button.Subtle icon={{ position: 'left', src: '/check.svg' }} disabled sizes={['s', 's', 's']}>
            Subtle
          </Button.Subtle>
        </div>
      </div>
    </div>
  )
}

export default ButtonPage
