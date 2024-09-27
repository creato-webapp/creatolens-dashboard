export const PROMPT_TEMPLATE = {
  PROMPT_TEMPLATE_GENERAL: `
  Generate an image with content of {{labels}} which match {{hashtags}},
  {{#lighting}} with {{lighting}} lighting,{{/lighting}}
  {{#environment}} set in a {{environment}} environment,{{/environment}}
  {{#color_scheme}} featuring a {{color_scheme}} color scheme,{{/color_scheme}}
  {{#point_of_view}} viewed from a {{point_of_view}} point of view,{{/point_of_view}}
  {{#camera_angle}} captured with a {{camera_angle}} camera angle,{{/camera_angle}}
  {{#lens_type}} using a {{lens_type}} lens,{{/lens_type}}
  {{#background}} against a {{background}} background,{{/background}}
  {{#mood}} evoking a {{mood}} mood,{{/mood}}
  {{#theme}} in a {{theme}} theme,{{/theme}}
  {{#action_and_movement}} showcasing {{action_and_movement}} action or movement.{{/action_and_movement}}
`,
  PROMPT_TEMPLATE_LOGO_DESIGN: `
{
  "negative_prompt": "T-shirt, human, photoframe, poster frame, background, complicated",
  "prompt": "simple, plain flat design, A flat logo design of {{labels}} which match {{hashtags}} \
  {{#lighting}}with {{lighting}} lighting, {{/lighting}} \
  {{#color_scheme}}featuring a {{color_scheme}} color scheme, {{/color_scheme}} \
  {{#point_of_view}}viewed from a {{point_of_view}} point of view, {{/point_of_view}} \
  {{#camera_angle}}captured with a {{camera_angle}} camera angle, {{/camera_angle}} \
  {{#background}}against a {{background}} background, {{/background}} \
  {{#mood}}evoking a {{mood}} mood, {{/mood}} \
  {{#theme}}in a {{theme}} theme, {{/theme}} \
}
`,
  PROMPT_TEMPLATE_SOCIAL_MEDIA: `
  Give me an image to posted on social media which have {{labels}} and hashtags: {{hashtags}}
  {{#lighting}} and {{lighting}} lighting{{/lighting}}
  {{#color_scheme}} featuring a {{color_scheme}} color scheme{{/color_scheme}}
  {{#point_of_view}} from a {{point_of_view}} point of view{{/point_of_view}}
  {{#camera_angle}} captured with a {{camera_angle}} camera angle{{/camera_angle}}
  {{#lens_type}} using a {{lens_type}} lens{{/lens_type}}
  {{#background}} against a {{background}} background{{/background}}
  {{#mood}} evoking a {{mood}} mood{{/mood}}
  {{#theme}} in a {{theme}} theme{{/theme}}
  in a social media context.
`,
  PROMPT_TEMPLATE_WEBSITE_DESIGN: `
  A {{labels}} in emoji style, 2d, IOS App icon style, simplelist, white background, minimalistic, and match {{hashtags}},
  {{#lighting}} with {{lighting}} lighting,{{/lighting}}
  {{#environment}} set in a {{environment}} environment,{{/environment}}
  {{#color_scheme}} featuring a {{color_scheme}} color scheme,{{/color_scheme}}
  {{#lens_type}} using a {{lens_type}} lens,{{/lens_type}}
  {{#background}} against a {{background}} background,{{/background}}
  {{#mood}} evoking a {{mood}} mood,{{/mood}}
  {{#theme}} in a {{theme}} theme,{{/theme}}
  {{#action_and_movement}} showcasing {{action_and_movement}} action or movement.{{/action_and_movement}}
`,
}

export type IPromptType = keyof typeof PROMPT_TEMPLATE
