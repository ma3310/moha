<?php
/**
 * @file
 */

/**
 * Class MohaMailerMailSystem
 */
class MohaMailerMailSystem implements MailSystemInterface {

  protected $htmlFormatClass;
  protected $mailClass;

  public function __construct() {
    if (drupal_autoload_class('MimeMailSystem')) {
      $this->htmlFormatClass = new MimeMailSystem;
    }
    else {
      $this->htmlFormatClass = new DefaultMailSystem;
    }
    if (drupal_autoload_class('JustSmtpMailSystem')) {
      $this->mailClass = new JustSmtpMailSystem;
    }
    else {
      $this->mailClass = new DefaultMailSystem;
    }
  }

  public function format(array $message) {
    return $this->htmlFormatClass->format($message);
  }

  public function mail(array $message) {
    return $this->mailClass->mail($message);
  }
}
