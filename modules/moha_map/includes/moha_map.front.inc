<?php
/**
 * @file
 */

/**
 * @return string
 */
function _moha_map_front() {
  try {
    $baidu_access_key = moha_array_variable_get(MOAH_MAP__VARIABLES, 'baidu_access_key', '');

    $content = array();

    if (empty($baidu_access_key)) {

    }
    else {
      $content['baidu_access_key'] = $baidu_access_key;
    }

    $html = theme('moha_map_baidu_marker', array(
      'content' => $content,
    ));
    print $html;
    return MENU_SITE_ONLINE;
  }
  catch (Exception $e) {
    watchdog_exception(__FUNCTION__, $e);
  }
}

/**
 * @return string
 */
function _moha_map_view($node) {
  try {
    $baidu_access_key = moha_array_variable_get(MOAH_MAP__VARIABLES, 'baidu_access_key', '');

    $content = array();


    // TODO allow user specify which domains could include this page later.
    drupal_add_http_header("X-Frame-Options", "ALLOWALL");

    if (empty($baidu_access_key)) {
      // Goto Moha Map is unavailable page.
    }
    else {
      $content['baidu_access_key'] = $baidu_access_key;
    }

    $content['lonlat'] = $node->moha_coordinator[LANGUAGE_NONE][0]['lon'] . ', ' . $node->moha_coordinator[LANGUAGE_NONE][0]['lat'];
    
    $content['info_window_contents'] = $node->body[LANGUAGE_NONE][0]['value'];
    $content['info_window_contents'] = str_replace(PHP_EOL,'',$content['info_window_contents']);
    $content['info_window_contents'] = str_replace("\r",'',$content['info_window_contents']);
    
    $content['title'] = $node->title;

    $map_type_id = $node->moha_map_type[LANGUAGE_NONE][0]['tid'];
    $map_type = moha_term_name_by_tid($map_type_id);

    switch (strtolower($map_type)) {
      default:
      case 'baidu':
        $moha_map_theme_name = 'moha_map_baidu_marker';
        break;
      case 'gaode':
        $moha_map_theme_name = 'moha_map_gaode_marker';
        break;
    }

    /*
    drupal_add_js(array(
      __MOHA_MAP => array(
        'info_window_contents' =>$content['info_window_contents'],
      )
    ), 'setting');
    */

    $html = theme($moha_map_theme_name, array(
      'content' => $content,
    ));
    print $html;
    return MENU_SITE_ONLINE;
  }
  catch (Exception $e) {
    watchdog_exception(__FUNCTION__, $e);
  }
}


