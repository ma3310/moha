<?php
/**
 * @file
 */

class MohaSurveyTemplateEntity extends Entity {

  /**
   * @return array
   */
  protected function defaultUri() {
    return array('path' => MOHA_SURVEY__URL__TEMPLATE_ADMIN_UI . '/manage/' . $this->identifier());
  }

  /**
   * @return string
   */
  protected function defaultLabel() {
    if (isset($this->is_new) && $this->is_new) {
      return '';
    }
    else {
      return parent::defaultLabel();
    }
  }
}
