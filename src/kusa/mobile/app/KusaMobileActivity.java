package kusa.mobile.app;

import android.content.Context;
import android.os.Bundle;
import org.apache.cordova.*;
import android.os.PowerManager;

public class KusaMobileActivity extends DroidGap {
	
	 private PowerManager.WakeLock wl;
	 
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wl = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK, "DoNotDimScreen");
    }
    
    @Override
    protected void onPause() {
            super.onPause();
            wl.release();
    }

    @Override
    protected void onResume() {
            super.onResume();
            wl.acquire();
    }
    
}