<?php

function moha_survey_weui_radios_labels($options, $default_value){
  $output='';
  foreach($options as $key => $option){
    if($default_value == $key){
      $default_checked = 'checked="checked"';
    } else {
      $default_checked = '';
    }
    $output .= '<label class="weui-cell weui-check__label" for="'. $key .'">
      <div class="weui-cell__bd">
          <p>'. $option .'</p>
      </div>
      <div class="weui-cell__ft">
          <input type="radio" class="weui-check" name="radio1" id="' . $key . '" ' . $default_checked .'>
          <span class="weui-icon-checked"></span>
      </div>
      </label>';
  }

  return $output;
}

?>

<div class="weui-cells__title"><?php print $element['#title'] ?></div>
<div class="weui-cells weui-cells_radio">
  <?php print moha_survey_weui_radios_labels($element['#options'], $element['#default_value']); ?>
</div>





