/** Pick a decorative icon for a project from its slug. */
export function projectIcon(slug: string): 'water' | 'school' | 'people' | 'leaf' | 'heart' | 'globe' | 'star' {
  if (/wasser|water/.test(slug)) return 'water';
  if (/erde|eco|saat/.test(slug)) return 'leaf';
  if (/kita|msingi|bildung|okushoma|ruhaama|school/.test(slug)) return 'school';
  if (/ours|safer|ubuntu-fuer/.test(slug)) return 'heart';
  if (/talks|engagement|fashion/.test(slug)) return 'people';
  return 'globe';
}
