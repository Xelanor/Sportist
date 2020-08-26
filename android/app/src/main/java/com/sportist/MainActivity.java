package com.sportist;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Sportist";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }
}
