interface ProgressBarProps {
  total_step: number
  current_step: number
}

const ProgressBar = (props: ProgressBarProps) => {
  const { total_step, current_step } = props

  const steps = Array.from({ length: total_step }, (_, index) => index + 1)

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {steps.map((step) => (
        <div
          key={step}
          style={{
            flex: 1,
            height: '7px',
            borderRadius: '24px',
            backgroundColor: step <= current_step ? '#ff5733' : '#d3d3d3', // Red for completed steps, grey for others
          }}
        ></div>
      ))}
    </div>
  )
}

export default ProgressBar
